/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLPlayer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONException;
import org.json.JSONObject;
import Shared.ConnectDb;
import java.util.logging.Level;
import java.util.logging.Logger;
import SQLRessource.*;

/**
 *
 * @author admin
 */
public class AccountPlayer 
{
    public JSONObject GetConnection(String userName, String password)
    {
        Connection con = null;
        
        con = new ConnectDb().GetConnection();
                
        JSONObject jplayer = new JSONObject();
        try{
            PreparedStatement statement = con.prepareStatement("SELECT * FROM JOUEUR WHERE userName like ? and passwordHash like ? ;", 1005, 1008);     
            statement.setString(1, userName);
            statement.setString(2, password);
            
            
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            rs.next();
            //Create Json
            
            jplayer.put("userName",rs.getString("userName"));
            jplayer.put("password ",rs.getString("passwordHash"));
            
            int id = rs.getInt("id");
            int idType =  rs.getInt("idTypeCompte");
            int idRessource = rs.getInt("idRessource");
            
            //Get type Account
            statement = con.prepareStatement("SELECT type FROM p_typecompte WHERE id = ? ;", 1005, 1008);     
            statement.setInt(1, idType);
            rs = statement.executeQuery();
            statement.clearParameters();
            rs.next();
            
            jplayer.put("role",rs.getString("type"));
            
            jplayer.put("status", true);
            con.close();
           }catch(SQLException | JSONException e){
            try {
                jplayer.put("status",false);
            } catch (JSONException ex) {
                System.out.print(ex);
            }
           }
        return jplayer;
   }
    
    
    public JSONObject CreateAccount(String userName, String password)
    {
        Connection con = null;
        
        con = new ConnectDb().GetConnection();
         
        JSONObject jplayer = new JSONObject();
        try{
            PreparedStatement statement = con.prepareStatement("INSERT INTO JOUEUR (userName, passwordHash, idTypeCompte)VALUES(?,?,2)", 1005, 1008);     
            statement.setString(1, userName);
            statement.setString(2, password);
            statement.executeUpdate();
            statement.clearParameters();
            
            
            statement = con.prepareStatement("Select MAX(id) from ressource ", 1005, 1008);     
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            rs.next();
            int id = rs.getInt(1);
            
            
            
            statement = con.prepareStatement("update joueur set idRessource = ? ORDER BY id DESC LIMIT 1", 1005, 1008);  
            statement.setInt(1, id);
            statement.executeUpdate();;
            con.close();
            
           }catch(SQLException e){
            try {
                jplayer.put("status","Le joueur n'a pas pu être créé, car le nom d'utilisateur existe déjà");
            } catch (JSONException ex) {
                System.out.print(ex);
            }
            return jplayer;
           }
        
        try {
                jplayer.put("status","Le joueur a été créé avec succès" );
            } catch (JSONException ex) {
                System.out.print(ex);
            }
        return jplayer;
   }
    
    public JSONObject getRessourcePlayer(String userName){
        Connection con = null;
        
        JSONObject ressourcePlayer = new JSONObject();
        
        con = new ConnectDb().GetConnection();
                
        try{
            PreparedStatement statement = con.prepareStatement("SELECT idRessource FROM JOUEUR WHERE userName = ? ;", 1005, 1008);     
            statement.setString(1, userName);            
            
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            rs.next();
            
            Ressource ressource = new Ressource();
            
            ressourcePlayer = ressource.getRessourceById(rs.getInt("idRessource"));
            
        } catch (SQLException ex) {
            Logger.getLogger(AccountPlayer.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return ressourcePlayer;
    }
}
