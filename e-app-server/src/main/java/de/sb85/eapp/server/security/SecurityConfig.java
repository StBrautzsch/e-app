package de.sb85.eapp.server.security;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.security.jwt.JwtAuthEntryPointComponent;
import de.sb85.eapp.server.security.jwt.JwtRequestFilterComponent;
import de.sb85.eapp.server.services.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtAuthEntryPointComponent jwtAuthEntryPointComponent;
    private final UserService userService;
    private final JwtRequestFilterComponent jwtRequestFilterComponent;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(JwtAuthEntryPointComponent jwtAuthEntryPointComponent,
                          UserService userService, JwtRequestFilterComponent jwtRequestFilterComponent, PasswordEncoder passwordEncoder) {
        this.jwtAuthEntryPointComponent = jwtAuthEntryPointComponent;
        this.userService = userService;
        this.jwtRequestFilterComponent = jwtRequestFilterComponent;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().disable();
        http
                .csrf().disable()
                .cors().and()
                .authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers(ApplicationConfig.DEMO_PLANNER_APP + "/**").permitAll()
                .antMatchers(ApplicationConfig.DEMO_CLIENT_APP + "/**").permitAll()
                .antMatchers(ApplicationConfig.API_V1_AUTH).permitAll()
                .antMatchers(ApplicationConfig.API_V1_AUTH_ACCOUNT).permitAll()
                .antMatchers(ApplicationConfig.API_V1_AUTH_ACCOUNT_VERIFICATION).permitAll()
                .antMatchers(ApplicationConfig.API_V1_AUTH_MAIL_VERIFICATION).permitAll()
                .antMatchers(ApplicationConfig.API_V1_AUTH_RENEW).hasRole(ApplicationConfig.ROLE_USER)
                .antMatchers(ApplicationConfig.API_START_CLIENT_APP, ApplicationConfig.API_START_PLANNER_APP).permitAll()
                .antMatchers(ApplicationConfig.API_LTI_CLIENT, ApplicationConfig.API_LTI_PLANNER).permitAll()
                .antMatchers(ApplicationConfig.API_V1_PING + "/**").permitAll()
                .antMatchers(ApplicationConfig.API_V1_BOOKING + "/**").permitAll()
                .antMatchers(ApplicationConfig.API_V1_ICAL + "/**").permitAll()
                .antMatchers(ApplicationConfig.API_V1_ICAL_FEED + "/**").permitAll()
                .antMatchers(ApplicationConfig.API_V1_ADMIN + "/**").hasRole(ApplicationConfig.ROLE_ADMIN)
                .antMatchers(ApplicationConfig.API_V1_PLANNER + "/**").hasRole(ApplicationConfig.ROLE_PLANNER)
                .antMatchers(ApplicationConfig.API_V1_CLIENT + "/**").hasRole(ApplicationConfig.ROLE_CLIENT)
                .antMatchers(ApplicationConfig.API_V1_USER + "/**").hasRole(ApplicationConfig.ROLE_USER)
                .anyRequest().authenticated().and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPointComponent)
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilterComponent, UsernamePasswordAuthenticationFilter.class);
    }

}
