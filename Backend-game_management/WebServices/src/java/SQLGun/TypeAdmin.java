/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLGun;

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
    public boolean AddTypeArme(String nom, int nourriture, int eau, int argent, int science, int force) {
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
             
             
             
            //Create type arme
            statement = con.prepareStatement("INSERT INTO `p_typearme`\n" +
                "(`idRessource`,`nom`,`force`)\n" +
                "VALUES (?,?,?);",
                    1005, 1008);  
            statement.setInt(1, idR);
            statement.setString(2, nom);
            statement.setInt(3, force);
            statement.executeUpdate();
            statement.clearParameters();
        }catch(SQLException e){
            return false;
            
        }
        
        return true;    
    }
    public boolean EditTypeArme(int id, String nom, int nourriture, int eau, int argent, int science, int force) {
        Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();
            
            //Get idRessource
             PreparedStatement statement = con.prepareStatement("Select idRessource from p_typearme where id = ?;", 1005, 1008);       
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
             
            //update p_typearme
            statement = con.prepareStatement("update p_typearme set nom = ?, `force` = ? where id = ?", 1005, 1008);  
            statement.setString(1, nom);
            statement.setInt(2, force);
            statement.setInt(3, id);
            statement.executeUpdate();
            statement.clearParameters();
            
        }catch(SQLException e){
            return false;
        }
        
        return true;
    }
    
    public boolean DeleteTypeArme(int id) {
        Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();
            
            //Get idRessource
             PreparedStatement statement = con.prepareStatement("Select idRessource from p_typearme where id = ?;", 1005, 1008);       
             statement.setInt(1, id);
             ResultSet rs = statement.executeQuery();
             rs.next();
             statement.clearParameters();
             
             int idRessource = rs.getInt("idRessource");
            
             
            //delete territoire
            statement = con.prepareStatement("Delete from p_typearme where id = ?", 1005, 1008);  
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
