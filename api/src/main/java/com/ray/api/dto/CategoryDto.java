package com.ray.api.dto;


import com.ray.api.entity.Product;
import com.ray.api.entity.ProductCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryDto {
    private Long id;
    private String categoryName;

    private List<ProductReturnDto> products;
    public CategoryDto() {
    }

    public CategoryDto(ProductCategory productCategory) {
        this.id = productCategory.getId();
        this.categoryName = productCategory.getCategoryName();
    }


    @Override
    public String toString() {
        return "CategoryDto{" +
                "id=" + id +
                ", category_name='" + categoryName + '\'' +
                '}';
    }
}
