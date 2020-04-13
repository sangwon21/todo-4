package com.codesquad.server.presentation.controllers;

import com.codesquad.server.domain.repository.ColumnsRepository;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/columns")
public class ColumnsController {

    private final Logger logger = LoggerFactory.getLogger(ColumnsController.class);

    @Autowired
    ColumnsRepository columnsRepository;

    /**
     * Column을 생성한다.
     *
     * @return Status Code를 반환(CREATED, 201)
     * @RequestBody {
     * "columnName": "practice",
     * "userIdx": "1",
     * }
     */
    @PostMapping("")
    public JSONObject create(@RequestBody Map<String, String> bodyMap) {
        return null;
    }

    /**
     * 전체 Column 목록 반환
     *
     * @return User 객체가 json 형태로 반환
     */

    /**
     * Column 이름 수정
     *
     * @return Status Code를 반환(NO_CONTENT, 204)
     * @RequestBody {
     * "afterName": "done"
     * }
     */
    @PutMapping("/{columnId}")
    public JSONObject update(@PathVariable Long columnId, @RequestBody HashMap<String, String> bodyMap) {
        return null;
    }

    /**
     * Column 삭제
     *
     * @return Status Code를 반환(NO_CONTENT, 204)
     */
    @DeleteMapping("/{columnId}")
    public JSONObject delete(@PathVariable Long columnId) {
        return null;
    }
}
