package com.structure.repositories;

import com.structure.models.Thumbnail;
import org.springframework.data.repository.CrudRepository;

public interface ThumbnailRepo extends CrudRepository<Thumbnail, String> {
}
