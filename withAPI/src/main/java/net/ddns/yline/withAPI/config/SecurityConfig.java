/*package net.ddns.yline.withAPI.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

//    private final JwtAuthenticationFilter jwtAuthFilter;
//    private final AuthenticationProvider authenticationProvider;
//    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //session 방식이 아닌 토큰 방식은 csrf 설정 필요없음
        http.csrf().disable()
                //인증여부
                .authorizeHttpRequests()
                //인증이 필요없는 화이트리스트 링크
                .requestMatchers("/api/v1/auth/**", "/test/**")
                .permitAll();

//                //다른 요청은 모두 인증받도록
//                .anyRequest()
//                .authenticated()
//                .and()
//
//                //세션 상태없음으로 설정
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//
//                //인증 제공자 설정
//                //---------추후개발예정-----------
//                .authenticationProvider(authenticationProvider)
//
//                //필터
//                //---------추후개발예정-----------
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
//
//                //로그아웃
//                .logout()
//                .logoutUrl("/api/v1/auth/logout")
//                //---------추후개발예정-----------
//                .addLogoutHandler(logoutHandler)
//                .logoutSuccessHandler(((request, response, authentication) -> SecurityContextHolder.clearContext()));

        return http.build();
    }
}
*/