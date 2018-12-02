package SQLGun;


import SQLArmure.Armure;
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

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Guns 
{
     public JSONArray getAllGuns(String userName) 
    {
        
        JSONArray jArme = new JSONArray();
        
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        try{
            PreparedStatement statement = con.prepareStatement(
                    "SELECT arme.id, arme.idTypeArme FROM game_management.arme\n" +
                    "join joueur on arme.idJoueur = joueur.id\n" +
                    "where joueur.userName = ?;"
                    , 1005, 1008);   
            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            
            while(rs.next())
            {
                JSONObject arme = new JSONObject();
                arme.put("id", rs.getInt("id"));
                arme.put("idType", rs.getInt("idTypeArme"));
                jArme.put(arme);
            }
             
            con.close();
           }catch(SQLException e){
           
             System.out.print(e.toString());
           } catch (JSONException ex) {
             Logger.getLogger(Armure.class.getName()).log(Level.SEVERE, null, ex);
         }
       
        return jArme;
    }
}
