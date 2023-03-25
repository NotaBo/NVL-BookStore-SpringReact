package com.ray.api.controller;


import com.ray.api.dao.CategoryRepository;
import com.ray.api.dto.CategoryDto;
import com.ray.api.dto.ProductReturnDto;
import com.ray.api.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<ProductCategory> categories =categoryRepository.findAll();
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for (ProductCategory p : categories) {
            CategoryDto categoryDto = new CategoryDto(p);
            categoryDtoList.add(categoryDto);
        }
        return new  ResponseEntity<>(categoryDtoList, HttpStatus.OK);
    }

    @GetMapping("{categoryId}")
    public ResponseEntity<CategoryDto> getProductByCategory(@PathVariable(value="categoryId") Long categoryId) {
        ProductCategory productCategory = categoryRepository.getById(categoryId);
        List<ProductReturnDto> returnDtoList =
                productCategory.getProducts().stream().map(ProductReturnDto::new).collect(Collectors.toList());
        CategoryDto dtoRes = new CategoryDto(productCategory);
        dtoRes.setProducts(returnDtoList);
        return new ResponseEntity<>(dtoRes, HttpStatus.OK);
    }
}
