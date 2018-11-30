/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLRessource;

import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
/**
 *
 * @author admin
 */
public class Ressource 
{    
public JSONObject getRessourceById(int id){
        Connection con = null;
        JSONObject ressource = new JSONObject();
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement(
                    "select\n" +
                    "nourriture,\n" +
                    "eau,\n" +
                    "argent,\n" +
                    "science\n" +
                    "from ressource " + 
                    "where id = ?"
                    , 1005, 1008);   
            
            statement.setInt(1, id); 

            ResultSet rs =  statement.executeQuery();
            statement.clearParameters();
            
            rs.next();
            
            ressource.put("nourriture", rs.getInt("nourriture"));
            ressource.put("eau", rs.getInt("eau"));
            ressource.put("argent", rs.getInt("argent"));
            ressource.put("science", rs.getInt("science"));
            
            con.close();
            
        } catch (SQLException ex) {
            Logger.getLogger(Ressource.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JSONException ex) {
            Logger.getLogger(Ressource.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return ressource;
    }
    
    public void EditRessourceById(int id, int nourriture, int eau, int argent, int science)
    {
        Connection con = null;
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement(
                    "update ressource \n" +
                    "set nourriture = nourriture + ?,\n" +
                    "eau = eau + ?,\n" +
                    "argent = argent + ?,\n" +
                    "science = science + ?\n" +
                    "where id = ?"
                    , 1005, 1008);   
            
            statement.setInt(1, nourriture);
            statement.setInt(2, eau);
            statement.setInt(3, argent);
            statement.setInt(4, science);
            statement.setInt(5, id);

            statement.executeUpdate();
            statement.clearParameters();
            
            con.close();
            
        } catch (SQLException ex) {
            Logger.getLogger(Ressource.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
