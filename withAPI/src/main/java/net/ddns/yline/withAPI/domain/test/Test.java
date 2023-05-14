package net.ddns.yline.withAPI.domain.test;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
public class Test {
    @Id
    @GeneratedValue
    private Long id;

    @Setter
    private String text;
}
