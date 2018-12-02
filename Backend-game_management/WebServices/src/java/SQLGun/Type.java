/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLGun;

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
public class Type 
{    
    public JSONArray getAllTypes() 
    {
        JSONArray jtypes = new JSONArray();
        
         Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        try{
            PreparedStatement statement = con.prepareStatement("SELECT * FROM p_typearme", 1005, 1008);   
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            
            while(rs.next())
            {
                JSONObject type = new JSONObject();
                
                int idRessource = rs.getInt("idRessource");
                String nom = rs.getString("nom");
                
                statement = con.prepareStatement("SELECT * FROM ressource where id  = ?", 1005, 1008);  
                statement.setInt(1, idRessource);
                
                ResultSet rt = statement.executeQuery();
                statement.clearParameters();
                
                rt.next();
                
                type.put("nourriture", rt.getDouble("nourriture"));
                type.put("eau", rt.getDouble("eau"));
                type.put("argent", rt.getDouble("argent"));
                type.put("science", rt.getDouble("science"));
                type.put("force", rs.getInt("force"));
                type.put("nom", nom);
                type.put("id", rs.getInt("id"));
                
                jtypes.put(type);
            }
            
           
         
            con.close();
           }catch(SQLException | JSONException e){
           
             System.out.print(e.toString());
           }
       
        return jtypes;
    }
    
    
    
    
}
