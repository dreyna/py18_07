/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.py18_07.daoImpl;

import com.py18_07.config.Conexion;
import com.py18_07.dao.Metodos;
import com.py18_07.entity.Categoria;
import com.py18_07.entity.Producto;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author dreyna
 */
public class ProductoDaoImpl implements Metodos<Producto>{
    private PreparedStatement ps;
    private ResultSet rs;
    private Connection cx;
    @Override
    public int create(Producto t) {
        int x = 0;
        String SQL = "INSERT INTO producto (nomprod, precio, cantidad, idcategoria) VALUES(?, ?, ?,?)";
        try {
            cx = Conexion.getConexion();
            ps = cx.prepareStatement(SQL);
            ps.setString(1, t.getNomprod());
            ps.setDouble(2, t.getPrecio());
            ps.setInt(3, t.getCantidad());
            ps.setInt(4, t.getIdcategoria());
           x = ps.executeUpdate();
            
        } catch (SQLException e) {
            System.out.println("Error: "+e);
        }
        return x;
    }

    @Override
    public int update(Producto t) {
       int x = 0;
        String SQL = "UPDATE producto SET nomprod = ?, precio = ?, cantidad = ?, idcategoria = ? WHERE idproducto = ?";
        try {
            cx = Conexion.getConexion();
            ps = cx.prepareStatement(SQL);
            ps.setString(1, t.getNomprod());
            ps.setDouble(2, t.getPrecio());
            ps.setInt(3, t.getCantidad());
            ps.setInt(4, t.getIdcategoria());
            ps.setInt(5, t.getIdproducto());
           x = ps.executeUpdate();
            
        } catch (SQLException e) {
            System.out.println("Error: "+e);
        }
        return x;
    }

    @Override
    public int delete(int id) {
        int x = 0;
        String SQL = "DELETE FROM producto WHERE idproducto = ?";
        try {
            cx = Conexion.getConexion();
            ps = cx.prepareStatement(SQL);
            ps.setInt(1, id);
           x = ps.executeUpdate();
            
        } catch (SQLException e) {
            System.out.println("Error: "+e);
        }
        return x;
    }

    @Override
    public Producto read(int id) {
        String SQL = "select *from producto where idproducto=?";
        Producto prod= new Producto();
        try {
            cx = Conexion.getConexion();
            ps = cx.prepareStatement(SQL);
            ps.setInt(1, id);
            rs = ps.executeQuery();
            while(rs.next()){
                    prod.setIdproducto(rs.getInt("idproducto"));
                    prod.setNomprod(rs.getString("nomprod"));
                    prod.setPrecio(rs.getDouble("precio"));
                    prod.setCantidad(rs.getInt("cantidad"));
                    prod.setIdcategoria(rs.getInt("idcategoria"));
            }
            
        } catch (SQLException e) {
            System.out.println("Error: "+e);
        }
        return prod;
    }

    @Override
    public List<Producto> readAll() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Map<String, Object>> readAll2() {
        String SQL = "SELECT p.idproducto, p.nomprod as producto, p.precio, p.cantidad, c.nomcat as categoria from producto as p " +
                                "inner join categoria as c on p.idcategoria = c.idcategoria";
        List<Map<String, Object>>lista = new ArrayList<>();
        try {
            cx = Conexion.getConexion();
            ps = cx.prepareStatement(SQL);
            rs = ps.executeQuery();
            while(rs.next()){
                    Map<String, Object> map = new HashMap<>();
                    map.put("idproducto", rs.getInt("idproducto"));
                    map.put("producto", rs.getString("producto"));
                    map.put("precio", rs.getDouble("precio"));
                    map.put("cantidad", rs.getInt("cantidad"));
                    map.put("categoria", rs.getString("categoria"));
                    lista.add(map);
            }            
        } catch (SQLException e) {
            System.out.println("Error: "+e);
        }
        return lista;
    }
    
}
