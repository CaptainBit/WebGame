/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLTerritoire;

import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
/**
 *
 * @author admin
 */
public class Territoire 
{    
    public JSONArray getAllTerritoire()
    {
        JSONArray jtypes = new JSONArray();
        
         Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement("SELECT * FROM territoire", 1005, 1008);   
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            while(rs.next())
            {
                JSONObject territoire = new JSONObject();
                
                int idRessource = rs.getInt("idRessource");
                
                statement = con.prepareStatement("SELECT * FROM ressource where id  = ?", 1005, 1008);  
                statement.setInt(1, idRessource);
                
                ResultSet rt = statement.executeQuery();
                statement.clearParameters();
                
                rt.next();
                
                int idJoueur = rs.getInt("idJoueur");
                
                statement = con.prepareStatement("SELECT * FROM joueur where id  = ?", 1005, 1008);  
                statement.setInt(1, idJoueur);
                
                ResultSet lstJoueur = statement.executeQuery();
                statement.clearParameters();
                
                lstJoueur.next();
                
                territoire.put("nourriture", rt.getDouble("nourriture"));
                territoire.put("eau", rt.getDouble("eau"));
                territoire.put("argent", rt.getDouble("argent"));
                territoire.put("science", rt.getDouble("science"));
                
                territoire.put("description", rs.getString("description"));
                territoire.put("idJoueur", idJoueur);
                territoire.put("id", rs.getInt("id"));
                
                territoire.put("joueur", lstJoueur.getString("userName"));
                
                jtypes.put(territoire);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
             System.out.print(e.toString());
           }
       
        return jtypes;
    }
    
    
    
    
}
