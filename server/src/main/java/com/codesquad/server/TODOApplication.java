package com.codesquad.server;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class TODOApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(TODOApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword("code-squad");

        //암호화할 내용
        String content = encryptor.encrypt("test");
        System.out.println("content = " + content);

        //테스트용 복호화
        String des = encryptor.decrypt(content);
        System.out.println("des = " + des);
    }
}
