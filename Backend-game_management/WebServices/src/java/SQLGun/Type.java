/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLGun;

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
    public final static String DRIVER = "com.mysql.cj.jdbc.Driver";
    public final static String SERVERNAME= "jdbc:mysql://localhost:3306";
    public final static String PORT = "80";
    public final static String SCHEMA = "game_management";
    public final static String PARAMETER = "?serverTimezone=UTC";
    public final static String USERNAME = "root";
    public final static String PASSWORD = "";
    
    
    
    public JSONArray getAllTypes()
    {
        JSONArray jtypes = new JSONArray();
        
        
        
         Connection con = null;
        try 
        {
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306" + "/" + SCHEMA +"?&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"; // a JDBC url
            con = DriverManager.getConnection(url, USERNAME, PASSWORD);
        } catch (SQLException | ClassNotFoundException e) 
        {
            System.out.print(e.toString());
        }
        
        
        try{
            PreparedStatement statement = con.prepareStatement("SELECT * FROM p_typearme", 1005, 1008);   
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            
            while(rs.next())
            {
                JSONObject type = new JSONObject();
                
                int idRessource = rs.getInt("idRessource");
                String nom = rs.getString("nomArme");
                
                statement = con.prepareStatement("SELECT * FROM ressource where id  = ?", 1005, 1008);  
                statement.setInt(1, idRessource);
                
                ResultSet rt = statement.executeQuery();
                statement.clearParameters();
                
                rt.next();
                
                type.put("nourriture", rt.getDouble("nourriture"));
                type.put("eau", rt.getDouble("eau"));
                type.put("argent", rt.getDouble("argent"));
                type.put("science", rt.getDouble("science"));
                type.put("nom", nom);
                
                
                jtypes.put(type);
            }
            
           
         
            con.close();
           }catch(SQLException | JSONException e){
           
             System.out.print(e.toString());
           }
       
        return jtypes;
    }
    
    
    
    
}
