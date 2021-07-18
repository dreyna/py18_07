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
public class Producto {
    private int idproducto;
    private String nomprod;
    private double precio;
    private int cantidad;
    private int idcategoria;

    public Producto() {
    }

    public Producto(String nomprod, double precio, int cantidad, int idcategoria) {
        this.nomprod = nomprod;
        this.precio = precio;
        this.cantidad = cantidad;
        this.idcategoria = idcategoria;
    }

    public int getIdproducto() {
        return idproducto;
    }

    public void setIdproducto(int idproducto) {
        this.idproducto = idproducto;
    }

    public String getNomprod() {
        return nomprod;
    }

    public void setNomprod(String nomprod) {
        this.nomprod = nomprod;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getIdcategoria() {
        return idcategoria;
    }

    public void setIdcategoria(int idcategoria) {
        this.idcategoria = idcategoria;
    }
    
            
}
