/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Asyn;

import static SQLPlayer.AccountPlayer.PASSWORD;
import static SQLPlayer.AccountPlayer.SCHEMA;
import static SQLPlayer.AccountPlayer.USERNAME;

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
public class Ressources 
{
    public void GetConnection(String userName, String password)
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
            PreparedStatement statement = con.prepareStatement("UPDATE ressource SET argent = argent + 10;", 1005, 1008);
            statement.executeUpdate();
            
            con.close();
           }catch(SQLException e){
            System.out.print(e.toString());
           }
   }
}
