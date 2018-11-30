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
     public JSONArray getArmurePlayer(String userName) 
    {
        JSONArray jArmure = new JSONArray();
        Map<String, String> map = new HashMap<String, String>();
        
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        try{
            PreparedStatement statement = con.prepareStatement(
                    "SELECT armure.id, idTypeArmure FROM game_management.armure\n" +
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
}
