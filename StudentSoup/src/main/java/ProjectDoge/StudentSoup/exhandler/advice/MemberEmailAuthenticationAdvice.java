package ProjectDoge.StudentSoup.exhandler.advice;

import ProjectDoge.StudentSoup.exception.EmailAuthentication.AuthenticationEmailNotSentException;
import ProjectDoge.StudentSoup.exception.EmailAuthentication.AuthenticationNumberNotSentException;
import ProjectDoge.StudentSoup.exception.EmailAuthentication.AuthenticationNumberWrongException;
import ProjectDoge.StudentSoup.exception.member.MemberNotFoundException;
import ProjectDoge.StudentSoup.exhandler.ErrorResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class MemberEmailAuthenticationAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(AuthenticationEmailNotSentException.class)
    public ErrorResult AuthenticationEmailNotSentException(AuthenticationEmailNotSentException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("AuthenticationEmailNotSentException", e.getMessage());
    }



}
