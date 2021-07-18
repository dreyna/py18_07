/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.py18_07.controller;

import com.google.gson.Gson;
import com.mysql.cj.util.EscapeTokenizer;
import com.py18_07.daoImpl.ProductoDaoImpl;
import com.py18_07.entity.Producto;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author dreyna
 */
public class ProductoController extends HttpServlet {
private final ProductoDaoImpl proddao = new ProductoDaoImpl();
private final Gson gson = new Gson();
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();  
        int op = Integer.parseInt(request.getParameter("opc"));
        switch(op){
            case 1: out.println(gson.toJson(proddao.readAll2()));
                break;
            case 2:out.println(gson.toJson(proddao.create(new Producto(request.getParameter("producto"),
                    Double.parseDouble(request.getParameter("precio")),Integer.parseInt(request.getParameter("cantidad")), Integer.parseInt(request.getParameter("categoria"))))));
                            break;
            case 3:Producto prod = new Producto();
                            prod.setIdproducto(Integer.parseInt(request.getParameter("idprod")));
                            prod.setIdcategoria(Integer.parseInt(request.getParameter("categoria")));
                            prod.setNomprod(request.getParameter("producto"));
                            prod.setPrecio(Double.parseDouble(request.getParameter("precio")));
                            prod.setCantidad(Integer.parseInt(request.getParameter("cantidad")));
                            out.println(gson.toJson(proddao.update(prod )));
                        break;
            case 4:out.println(gson.toJson(proddao.delete(Integer.parseInt(request.getParameter("idprod")))));
                        break;
            case 5:out.println(gson.toJson(proddao.read(Integer.parseInt(request.getParameter("idprod")))));
                        break;

        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
