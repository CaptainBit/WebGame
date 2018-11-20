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

/**
 *
 * @author admin
 */
public class AccountPlayer 
{
    public final static String DRIVER = "com.mysql.cj.jdbc.Driver";
    public final static String SERVERNAME= "jdbc:mysql://localhost:3306";
    public final static String PORT = "80";
    public final static String SCHEMA = "game_management";
    public final static String PARAMETER = "?serverTimezone=UTC";
    public final static String USERNAME = "root";
    public final static String PASSWORD = "";
    
    public JSONObject GetConnection(String userName, String password)
    {
         Connection con = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306" + "/" + SCHEMA +"?&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"; // a JDBC url
            con = DriverManager.getConnection(url, USERNAME, PASSWORD);
        } catch (SQLException | ClassNotFoundException e) 
        {
            System.out.print(e.toString());
        }
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
            
            
            //Add ressources
            statement = con.prepareStatement("SELECT * FROM RESSOURCE WHERE id = ? ;", 1005, 1008);     
            statement.setInt(1, idRessource);
            rs = statement.executeQuery();
            statement.clearParameters();
            
            rs.next();
            
            jplayer.put("nourriture", rs.getDouble("nourriture"));
            jplayer.put("eau", rs.getDouble("eau"));
            jplayer.put("argent", rs.getDouble("argent"));
            jplayer.put("science", rs.getDouble("science"));
            
            
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
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306" + "/" + SCHEMA +"?&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"; // a JDBC url
            con = DriverManager.getConnection(url, USERNAME, PASSWORD);
        } catch (SQLException | ClassNotFoundException e) 
        {
            System.out.print(e.toString());
        }
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
                jplayer.put("status","Player not created : userName already exist");
            } catch (JSONException ex) {
                System.out.print(ex);
            }
            return jplayer;
           }
        
        try {
                jplayer.put("status","Player created :" );
            } catch (JSONException ex) {
                System.out.print(ex);
            }
        return jplayer;
   }
}
