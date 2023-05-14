package net.ddns.yline.withAPI.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import net.ddns.yline.withAPI.domain.test.Test;
import net.ddns.yline.withAPI.service.TestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @GetMapping("/tests")
    public Result membersV2(){
        List<Test> findMembers = testService.findTests();
        List<TestDto> collect = findMembers.stream()
                .map(t -> new TestDto(t.getText()))
                .collect(Collectors.toList());

        return new Result(collect);
    }

    @PostMapping("/new")
    public CreateTestResponse saveTest(@RequestBody @Valid CreateTestRequest request) {

        Test test = new Test();
        test.setText(request.getText());

        Long id = testService.join(test);
        return new CreateTestResponse(id);
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    @Data
    @AllArgsConstructor
    static class TestDto{
        private String text;
    }

    @Data
    static class CreateTestRequest{
        public String text;
    }

    @Data
    static class CreateTestResponse {
        private Long id;

        public CreateTestResponse(Long id) {
            this.id = id;
        }
    }
}
