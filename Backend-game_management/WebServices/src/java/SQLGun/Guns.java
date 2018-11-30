package SQLGun;


import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
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
public class Guns 
{
     public JSONArray getAllGuns(String userName) 
    {
        
        JSONArray  jAllGuns= null;
        
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
       
        
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        
        try{
            PreparedStatement statement = con.prepareStatement("SELECT idTypeArme FROM arme join joueur on arme.idJoueur = joueur.id where joueur.userName  = ?", 1005, 1008);   
            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            
            while(rs.next())
            {
                
                int idGun = rs.getInt("idTypeArme");
                if(map.containsKey(idGun))
                {
                    int i = Integer.valueOf(map.get(idGun));
                    i++;
                    map.put(idGun, i);
                    
                }else{
                    map.put(idGun, 1);
                }
                
            }
            
            jAllGuns = new JSONArray();
            
           
            for (Map.Entry<Integer, Integer> entry : map.entrySet())
            {
                JSONObject jguns = new JSONObject();
                jguns.put("type",entry.getKey());
                jguns.put("nombre", entry.getValue());
                jAllGuns.put(jguns);
            }
             
            con.close();
           }catch(SQLException  | JSONException e){
           
             System.out.print(e.toString());
           }
       
        return jAllGuns;
    }
}
