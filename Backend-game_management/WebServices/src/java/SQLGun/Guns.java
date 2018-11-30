package SQLGun;


import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
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
     public JSONObject getAllGuns(String userName) 
    {
        
        Map<String, String> map = new HashMap<String, String>();
       
        
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        JSONObject jguns = null;
        
        try{
            PreparedStatement statement = con.prepareStatement("SELECT idArme FROM soldat join joueur on soldat.idJoueur = joueur.id where joueur.userName  = ?", 1005, 1008);   
            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            
            while(rs.next())
            {
                
                int idGun = rs.getInt("idArme");
                String strId = String.valueOf(idGun);
                
                if(map.containsKey(strId))
                {
                    int i = Integer.valueOf(map.get(strId));
                    i++;
                    map.put(strId, String.valueOf(i));
                    
                }else{
                    map.put(strId, "1");
                }
                
            }
             jguns = new JSONObject(map);
             
            con.close();
           }catch(SQLException e){
           
             System.out.print(e.toString());
           }
       
        return jguns;
    }
}
