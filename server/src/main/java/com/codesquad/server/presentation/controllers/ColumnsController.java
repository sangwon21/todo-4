package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.columns.ColumnsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/columns")
public class ColumnsController {

    private final Logger logger = LoggerFactory.getLogger(ColumnsController.class);

    @Autowired
    ColumnsRepository columnsRepository;


}
