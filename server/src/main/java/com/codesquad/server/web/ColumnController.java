package com.codesquad.server.web;

import com.codesquad.server.domain.Column;
import com.codesquad.server.domain.User;
import com.codesquad.server.repository.ColumnRepository;
import com.codesquad.server.repository.UserRepository;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/columns")
public class ColumnController {

    private final Logger logger = LoggerFactory.getLogger(ColumnController.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    ColumnRepository columnRepository;

    /**
     * Column을 생성한다.
     *
     * @RequestBody
     *{
     * 	"columnName": "practice",
     * 	"userIdx": "1",
     * }
     *
     * @return
     * Status Code를 반환(CREATED, 201)
     */
    @PostMapping("")
    public JSONObject create(@RequestBody Map<String, String> bodyMap) {
        User user = userRepository.findById(Long.parseLong(bodyMap.get("userIdx"))).orElseThrow(NoSuchElementException::new);
        user.addColumn(bodyMap.get("columnName"));
        userRepository.save(user);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("StatusCode", HttpStatus.CREATED.value());
        return jsonObject;
    }

    /**
     * 전체 Column 목록 반환
     *
     * @return
     * User 객체가 json 형태로 반환
     */
    @GetMapping("")
    public List<Column> list() {
        String userId = "hamill";
        User user = userRepository.findUserByUserId(userId).orElseThrow(NoSuchElementException::new);
        return user.getColumns();
    }

    /**
     * Column 이름 수정
     *
     * @RequestBody
     *{
     * 	"afterName": "done"
     * }
     *
     * @return
     * Status Code를 반환(NO_CONTENT, 204)
     */
    @PutMapping("/{columnId}")
    public JSONObject update(@PathVariable Long columnId, @RequestBody HashMap<String, String> bodyMap) {
        Column column = columnRepository.findById(columnId).orElseThrow(NoSuchElementException::new);
        column.setTitle(bodyMap.get("afterName"));
        columnRepository.save(column);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("StatusCode", HttpStatus.NO_CONTENT.value());
        return jsonObject;
    }

    /**
     * Column 삭제
     *
     * @return
     * Status Code를 반환(NO_CONTENT, 204)
     */
    @DeleteMapping("/{columnId}")
    public JSONObject delete(@PathVariable Long columnId) {
        Column column = columnRepository.findById(columnId).orElseThrow(NoSuchElementException::new);
        columnRepository.delete(column);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("StatusCode", HttpStatus.NO_CONTENT.value());
        return jsonObject;
    }
}
