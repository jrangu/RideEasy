package com.rideeaseproject.repository;

import com.rideeaseproject.model.Riders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


@Repository
public interface RidersRepo extends JpaRepository<Riders, Integer> {
	
	@Query("SELECT d FROM Riders d WHERE LOWER(d.email) = LOWER(:email)")
    public Riders getRiderByEmail(@Param("email") String email);

	@Modifying
	@Transactional
	@Query(value = "update riders set is_registered_user = ?1 where id =?2", nativeQuery = true)
    public void registerForSMS(boolean isRegisterUser, long id);
}
