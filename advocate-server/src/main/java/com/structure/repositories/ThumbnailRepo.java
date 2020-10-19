package com.structure.repositories;

import com.structure.models.Thumbnail;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThumbnailRepo extends CrudRepository<Thumbnail, String> {
}
