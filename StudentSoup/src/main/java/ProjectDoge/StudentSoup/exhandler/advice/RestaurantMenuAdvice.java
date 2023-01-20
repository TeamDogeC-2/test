package ProjectDoge.StudentSoup.exhandler.advice;

import ProjectDoge.StudentSoup.exception.restaurant.RestaurantMenuNotFoundException;
import ProjectDoge.StudentSoup.exception.restaurant.RestaurantMenuNotSentException;
import ProjectDoge.StudentSoup.exception.restaurant.RestaurantMenuValidationException;
import ProjectDoge.StudentSoup.exception.restaurant.RestaurantStarLikedMoreThanFiveException;
import ProjectDoge.StudentSoup.exhandler.ErrorResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class RestaurantMenuAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RestaurantMenuValidationException.class)
    public ErrorResult restaurantMenuValidationHandler(RestaurantMenuValidationException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("RestaurantMenuValidation",e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RestaurantMenuNotFoundException.class)
    public ErrorResult restaurantMenuNotFoundHandler(RestaurantMenuNotFoundException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("RestaurantMenuNotFound", e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RestaurantMenuNotSentException.class)
    public ErrorResult restaurantMenuNotSentHandler(RestaurantMenuNotSentException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("RestaurantMenuNotSent",e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RestaurantStarLikedMoreThanFiveException.class)
    public ErrorResult RestaurantStarLikedMoreThanFiveHandler(RestaurantStarLikedMoreThanFiveException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("RestaurantStarLikedMoreThanFive",e.getMessage());
    }
}
