/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.py18_07.entity;

/**
 *
 * @author dreyna
 */
public class Categoria {
    private int idcategoria;
    private String nomcat;

    public Categoria() {
    }

    public Categoria(String nomcat) {
        this.nomcat = nomcat;
    }

    public int getIdcategoria() {
        return idcategoria;
    }

    public void setIdcategoria(int idcategoria) {
        this.idcategoria = idcategoria;
    }

    public String getNomcat() {
        return nomcat;
    }

    public void setNomcat(String nomcat) {
        this.nomcat = nomcat;
    }
    
}
