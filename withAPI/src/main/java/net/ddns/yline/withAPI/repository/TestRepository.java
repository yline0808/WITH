package net.ddns.yline.withAPI.repository;

import net.ddns.yline.withAPI.domain.test.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TestRepository extends JpaRepository<Test, Long> {
    Optional<Test> findByText(String title);
}
