package com.ray.api.controller;

import com.ray.api.dao.CategoryRepository;
import com.ray.api.dao.ProductRepository;
import com.ray.api.dao.ProductSpecification;
import com.ray.api.dto.CategoryDto;
import com.ray.api.dto.ProductReturnDto;
import com.ray.api.entity.Product;
import com.ray.api.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ProductController {
    private final ProductRepository productRepository;
    private final CategoryRepository productCategoryRepository;

    @Autowired
    public ProductController(ProductRepository productRepository, CategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<ProductReturnDto>> getAllProducts() {
        List<Product> products = productRepository.findAll();
//        List<ProductReturnDto> returnDtoList = new ArrayList<>();
//        for (Product p : products) {
//            ProductReturnDto productReturnDto = new ProductReturnDto(p);
//            returnDtoList.add(productReturnDto);
//        }

        List<ProductReturnDto> returnDtoList =
                products.stream().map(ProductReturnDto::new).collect(Collectors.toList());

        return new ResponseEntity<>(returnDtoList, HttpStatus.OK);
    }


    @GetMapping("/{productId}")
    public ResponseEntity<ProductReturnDto> getProductById(@PathVariable("productId") Long productId) {
        Product product = productRepository.findById(productId).get();
        return new ResponseEntity<>(new ProductReturnDto(product), HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity<List<ProductReturnDto>> searchProduct
            (@RequestParam(value = "name", defaultValue = "all") String name,
             @RequestParam(value = "brand", defaultValue = "all") String brand,
             @RequestParam(value = "category", defaultValue = "all") String category) {
      List<Product> products = productRepository.findAll(
            Specification.where(ProductSpecification.searchByName(name)
                    .and(ProductSpecification.filterByBrand(brand))
                    .and(ProductSpecification.filterByCategoryId(category)))
      );
      List<ProductReturnDto> returnDtoList = products.stream()
              .map(product -> new ProductReturnDto(product)).collect(Collectors.toList());
      return new ResponseEntity<>(returnDtoList,HttpStatus.OK);
    };
}
