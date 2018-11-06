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
            PreparedStatement statement = con.prepareStatement("SELECT * FROM JOUEUR WHERE userName like ? and password like ? ;", 1005, 1008);     
            statement.setString(1, userName);
            statement.setString(2, password);
            statement.clearParameters();
            ResultSet rs = statement.executeQuery();
            con.close();
            //Create Json
            jplayer.put("userName",rs.getString("userName"));
            jplayer.put("idRessource",rs.getString("idRessource"));
            jplayer.put("passwordHash ",rs.getString("passwordHash"));
            jplayer.put("types_description", rs.getString("types.description"));

           }catch(SQLException | JSONException e){
            try {
                jplayer.put("error","no player found");
            } catch (JSONException ex) {
                System.out.print(ex);
            }
           }
        return jplayer;
   }
}
