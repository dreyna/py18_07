/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.py18_07.dao;

import java.util.List;
import java.util.Map;

/**
 *
 * @author dreyna
 * @param <T>
 */
public interface Metodos<T> {
    int create(T t);
    int update(T t);
    int delete(int id);
    T read(int id);
    List<T> readAll();
    List<Map<String, Object>> readAll2();
}
