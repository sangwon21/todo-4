package com.codesquad.server;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class TODOApplication {
    public static void main(String[] args) {
        SpringApplication.run(TODOApplication.class, args);
    }
}
