package ProjectDoge.StudentSoup.dto.restaurant;

import ProjectDoge.StudentSoup.entity.file.ImageFile;
import ProjectDoge.StudentSoup.entity.restaurant.Restaurant;
import lombok.Data;

import java.time.LocalTime;

@Data
public class RestaurantDto {
    private Long restaurantId;
    private String restaurantCategory;
    private String name;
    private String address;
    private LocalTime startTime;
    private LocalTime endTime;
    private String distance;
    private String fileName;
    private float starLiked;
    private int likedCount;
    private boolean like;
    private String detail;

    // 생성 메서드
    public RestaurantDto createRestaurantDto(Restaurant restaurant, boolean like){
        this.restaurantId = restaurant.getId();
        this.restaurantCategory = restaurant.getRestaurantCategory().getRestaurantCategory();
        this.name = restaurant.getName();
        this.address = restaurant.getAddress();
        this.startTime = restaurant.getStartTime();
        this.endTime = restaurant.getEndTime();
        this.fileName = setImageFile(restaurant);
        this.starLiked = restaurant.getStarLiked();
        this.likedCount = restaurant.getLikedCount();
        this.distance = restaurant.getDistance() + "M";
        this.like = like;
        this.detail = restaurant.getDetail();
        return this;
    }

    // 비즈니스 로직
    private String setImageFile(Restaurant restaurant){
        ImageFile imageFile = restaurant.getImageFile();
        if(imageFile == null){
            return null;
        }
        return imageFile.getFileName();
    }
}
