package net.ddns.yline.withAPI.service;

import lombok.RequiredArgsConstructor;
import net.ddns.yline.withAPI.domain.test.Test;
import net.ddns.yline.withAPI.repository.TestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TestService {
    private final TestRepository testRepository;

    public List<Test> findTests(){
        return testRepository.findAll();
    }

    @Transactional
    public Long join(Test test) {
        testRepository.save(test);
        return test.getId();
    }
}
