package Shared;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author wil90
 */
 public class ConnectDb {
     
    public final static String DRIVER = "com.mysql.cj.jdbc.Driver";
    public final static String SERVERNAME= "localhost";
    public final static String PORT = "3306";
    public final static String SCHEMA = "game_management";
    public final static String PARAMETER = "?serverTimezone=UTC";
    public final static String USERNAME = "root";
    public final static String PASSWORD = "root123";
    
    public Connection GetConnection()
    {
        Connection con = null;
        String url = "jdbc:mysql://" + SERVERNAME + ":" + PORT + "/" + SCHEMA + PARAMETER;
        
        
         //propreties for server
        Properties properties = new Properties();
        properties.setProperty("user", USERNAME);
        properties.setProperty("password", PASSWORD);
        properties.setProperty("useSSL", "false");
        properties.setProperty("verifyServerCertificate", "true");
        properties.setProperty("requireSSL", "false");
        
        try {
            
            Class.forName(DRIVER).newInstance();
            con = DriverManager.getConnection(url, properties);
        } catch (IllegalAccessException | InstantiationException | SQLException | ClassNotFoundException e) 
        {
            System.out.print(e.toString());
        }
        
        return con;
    }
}
