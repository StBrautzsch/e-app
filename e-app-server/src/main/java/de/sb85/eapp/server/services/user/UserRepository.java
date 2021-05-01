package de.sb85.eapp.server.services.user;

import de.sb85.eapp.server.services.user.data.Client;
import de.sb85.eapp.server.services.user.data.Planner;
import de.sb85.eapp.server.services.user.data.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByMail(String mail);

    Optional<User> findByMoodleUserId(String moodleId);

    Optional<User> findByFeedsRef(String feedsRef);

    User findByClient(Client client);

    User findByPlanner(Planner planner);

    Iterable<User> findByPlannerInAndSystemUserFalseAndPlannerActiveTrueAndBookingActiveTrueAndActiveTrueOrderByNameAscPreNameAsc(Iterable<Planner> planners);

    Iterable<User> findAllBySystemUserTrue();

    Iterable<User> findAllBySystemUserFalseOrderByNameAscPreNameAsc();

    Iterable<User> findAllBySystemUserFalseAndPlannerNotNull();

}
