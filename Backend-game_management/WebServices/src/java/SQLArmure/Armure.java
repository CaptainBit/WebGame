package SQLArmure;


import SQLArmure.*;
import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import SQLRessource.Ressource;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Armure 
{
    
    public boolean EditArmureSoldat(int idArmure, int idSoldat){
        
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        try{
            PreparedStatement statement;
            
            statement = con.prepareStatement(
                "update armure set idSoldat = NULL where idSoldat = ?;"
                , 1005, 1008);   
        
            statement.setInt(1, idSoldat);
            

            statement.executeUpdate();
            statement.clearParameters();
            
            
            if(idArmure > 0){
                
                statement = con.prepareStatement(
                    "update armure set idSoldat = ? where id = ?;"
                    , 1005, 1008);   
            
                statement.setInt(1, idSoldat);
                statement.setInt(2, idArmure);
            }
            
            
            statement.executeUpdate();
            statement.clearParameters();
            
           }catch(SQLException e){
             System.out.print(e.toString());
           } 
         
         return true;    
    }
    
     public JSONArray getArmurePlayer(String userName) 
    {
        JSONArray jArmure = new JSONArray();
        
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        try{
            PreparedStatement statement = con.prepareStatement(
                    "SELECT armure.id, armure.idTypeArmure, armure.idSoldat FROM game_management.armure\n" +
                    "join joueur on armure.idJoueur = joueur.id\n" +
                    "where joueur.userName = ?;"
                    , 1005, 1008);   
            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            
            while(rs.next())
            {
                JSONObject armure = new JSONObject();
                armure.put("id", rs.getInt("id"));
                armure.put("idType", rs.getInt("idTypeArmure"));
                armure.put("idSoldat", rs.getInt("idSoldat"));
                jArmure.put(armure);
            }
             
            con.close();
           }catch(SQLException e){
           
             System.out.print(e.toString());
           } catch (JSONException ex) {
             Logger.getLogger(Armure.class.getName()).log(Level.SEVERE, null, ex);
         }
       
        return jArmure;
    }
     
     public boolean AddArmure(String userName, int idType){
                 
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        try{
            PreparedStatement statement = con.prepareStatement(
                    "select idRessource, id from joueur where userName = ?"
                    , 1005, 1008);   
            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            rs.next();
            
            int idJoueur = rs.getInt("id");
            int idRessource = rs.getInt("idRessource");
            
            statement = con.prepareStatement(
                    "INSERT INTO armure\n" +
                    "(idJoueur, idTypeArmure)\n" +
                    "VALUES(?, ?);"
                    , 1005, 1008);   
            
            statement.setInt(1, idJoueur);
            statement.setInt(2, idType);
            
            statement.executeUpdate();
            statement.clearParameters();
             
            
            
            JSONObject ressourceType = getRessource(con, idType);
            
            con.close();
            
            Ressource ressource = new Ressource();
            int nourriture = ressourceType.getInt("nourriture");
            int eau = ressourceType.getInt("eau");
            int argent = ressourceType.getInt("argent");
            int science = ressourceType.getInt("science");

            ressource.EditRessourceById(idRessource,-nourriture, -eau, -argent, -science);
            
           }catch(SQLException e){
           
             System.out.print(e.toString());
           } catch (JSONException ex) { 
             Logger.getLogger(Armure.class.getName()).log(Level.SEVERE, null, ex);
         }
         
         return true;
     }
     
     public boolean DeleteArmure(int idArmure, int idType, String userName){
         
         Connection con = null;
         
         try {
            con = new ConnectDb().GetConnection();     
             
            PreparedStatement statement = con.prepareStatement(
                    "Delete from armure where id = ?;"
                    , 1005, 1008);

            statement.setInt(1, idArmure);
            statement.executeUpdate();
            statement.clearParameters();  

            statement = con.prepareStatement(
                       "SELECT idRessource FROM joueur where userName = ?;"
                    , 1005, 1008);

            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();

            rs.next();
             
            int idRessource = rs.getInt("idRessource");
            
            JSONObject ressourceType = getRessource(con, idType);
            
            con.close();
            
            Ressource ressource = new Ressource();
            int nourriture = ressourceType.getInt("nourriture");
            int eau = ressourceType.getInt("eau");
            int argent = ressourceType.getInt("argent");
            int science = ressourceType.getInt("science");

            ressource.EditRessourceById(idRessource,nourriture / 2, eau / 2, argent / 2, science / 2);
             
             return true;
         }
        catch (SQLException ex) {
             Logger.getLogger(Armure.class.getName()).log(Level.SEVERE, null, ex);
         } catch (JSONException ex) {
             Logger.getLogger(Armure.class.getName()).log(Level.SEVERE, null, ex);
         }
        return false;
     }
          
     private JSONObject getRessource(Connection con, int idType){
         JSONObject ressource = new JSONObject();

         try {
             PreparedStatement statement = con.prepareStatement(
                     "SELECT \n" +
                             "ressource.nourriture, ressource.argent, \n" +
                             "ressource.eau, ressource.science \n" +
                             "FROM p_typearmure\n" +
                             "join ressource on idRessource = ressource.id\n" +
                             "where p_typearmure.id = ?;"
                     , 1005, 1008);
             
             statement.setInt(1, idType);
             ResultSet rs = statement.executeQuery();
             statement.clearParameters();
             
             rs.next();
            
            ressource.put("argent", rs.getInt("argent"));
            ressource.put("eau", rs.getInt("eau"));
            ressource.put("science", rs.getInt("science"));
            ressource.put("nourriture", rs.getInt("nourriture"));
            
             
         } catch (SQLException ex) {
             Logger.getLogger(Armure.class.getName()).log(Level.SEVERE, null, ex);
         } catch (JSONException ex) {
             Logger.getLogger(Armure.class.getName()).log(Level.SEVERE, null, ex);
         }
         
         return ressource;
     }
}
