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
public class ConnectPlayer 
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
            
            //Add ressources
            statement = con.prepareStatement("SELECT * FROM RESSOURCE WHERE id = ? ;", 1005, 1008);     
            statement.setInt(1, rs.getInt("id"));
            rs = statement.executeQuery();
            statement.clearParameters();
            
            rs.next();
            
            jplayer.put("nourriture", rs.getDouble("nourriture"));
            jplayer.put("eau", rs.getDouble("eau"));
            jplayer.put("argent", rs.getDouble("argent"));
            jplayer.put("science", rs.getDouble("science"));
            
            con.close();
           }catch(SQLException | JSONException e){
            try {
                jplayer.put("error","no player found :" + e.toString());
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
            PreparedStatement statement = con.prepareStatement("INSERT INTO JOUEUR (userName, passwordHash)VALUES(?,?)", 1005, 1008);     
            statement.setString(1, userName);
            statement.setString(2, password);
            
            statement.executeUpdate();
         
            con.close();
            
           }catch(SQLException e){
            try {
                jplayer.put("error","Player not created :" + e.toString());
            } catch (JSONException ex) {
                System.out.print(ex);
            }
           }
        return jplayer;
   }
}
