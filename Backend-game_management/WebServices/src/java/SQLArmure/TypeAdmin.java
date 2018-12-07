/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLArmure;

import SQLGun.*;
import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author wil90
 */
public class TypeAdmin {
    public boolean AddTypeArmure(String nom, int nourriture, int eau, int argent, int science, int vie) {
        Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();      
            
            
            //Create idRessource
            PreparedStatement statement = con.prepareStatement("INSERT INTO ressource (`nourriture`, `eau`, `argent`, `science`) VALUES (?,?,?,?)", 1005, 1008);  
            statement.setInt(1, nourriture);
            statement.setInt(2, eau);
            statement.setInt(3, argent);
            statement.setInt(4, science);
            statement.executeUpdate();
            statement.clearParameters();
            
            //Get last id ressource
             statement = con.prepareStatement("Select MAX(id) from ressource ", 1005, 1008);       
             ResultSet rs = statement.executeQuery();
             rs.next();
             statement.clearParameters();
             
             int idR = rs.getInt(1);
             
             
             
            //Create type armure
            statement = con.prepareStatement("INSERT INTO `p_typearmure`\n" +
                "(`idRessource`,`nom`,`vie`)\n" +
                "VALUES (?,?,?);",
                    1005, 1008);  
            statement.setInt(1, idR);
            statement.setString(2, nom);
            statement.setInt(3, vie);
            statement.executeUpdate();
            statement.clearParameters();
        }catch(SQLException e){
            return false;
            
        }
        
        return true;    
    }
    public boolean EditTypeArmure(int id, String nom, int nourriture, int eau, int argent, int science, int vie) {
        Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();
            
            //Get idRessource
             PreparedStatement statement = con.prepareStatement("Select idRessource from p_typearmure where id = ?;", 1005, 1008);       
             statement.setInt(1, id);
             ResultSet rs = statement.executeQuery();
             rs.next();
             statement.clearParameters();
             
             int idRessource = rs.getInt("idRessource");
            
            //update idRessource
            statement = con.prepareStatement("update ressource set nourriture = ?, eau = ?, argent = ?, science = ? where id = ?", 1005, 1008);  
            statement.setInt(1, nourriture);
            statement.setInt(2, eau);
            statement.setInt(3, argent);
            statement.setInt(4, science);
            statement.setInt(5, idRessource);
            statement.executeUpdate();
            statement.clearParameters();
             
            //update p_typearmure
            statement = con.prepareStatement("update p_typearmure set nom = ?, `vie` = ? where id = ?", 1005, 1008);  
            statement.setString(1, nom);
            statement.setInt(2, vie);
            statement.setInt(3, id);
            statement.executeUpdate();
            statement.clearParameters();
            
        }catch(SQLException e){
            return false;
        }
        
        return true;
    }
    
    public boolean DeleteTypeArmure(int id) {
        Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();
            
            //Get idRessource
             PreparedStatement statement = con.prepareStatement("Select idRessource from p_typearmure where id = ?;", 1005, 1008);       
             statement.setInt(1, id);
             ResultSet rs = statement.executeQuery();
             rs.next();
             statement.clearParameters();
             
             int idRessource = rs.getInt("idRessource");
            
             
            //delete territoire
            statement = con.prepareStatement("Delete from p_typearmure where id = ?", 1005, 1008);  
            statement.setInt(1, id);
            statement.executeUpdate();
            statement.clearParameters();
             
            //delete ressource
            statement = con.prepareStatement("Delete from ressource where id = ?", 1005, 1008);  
            statement.setInt(1, idRessource);
            statement.executeUpdate();
            statement.clearParameters();
             
        }catch(SQLException e){
            return false;
        }
        
        return true;
    }
}
