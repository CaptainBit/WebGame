package SQLPlayer;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONException;
import org.json.JSONObject;
import Shared.ConnectDb;
import java.util.logging.Level;
import java.util.logging.Logger;
import SQLRessource.*;
import org.json.JSONArray;

/**
 *
 * @author admin
 */
public class AccountAdministration 
{
    public JSONArray GetAllPlayer()
    {
        Connection con = null;
        
        con = new ConnectDb().GetConnection();
        JSONArray jAllplayers = new JSONArray();
        JSONObject jplayer = null;
        try{
            PreparedStatement statement = con.prepareStatement("SELECT * FROM JOUEUR ;", 1005, 1008);     
       
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            
            while(rs.next()){
                jplayer = new JSONObject();
                jplayer.put("userName",rs.getString("userName"));
                jplayer.put("password",rs.getString("passwordHash"));
            
               
                int idType =  rs.getInt("idTypeCompte");
            
                //Get type Account
                statement = con.prepareStatement("SELECT type FROM p_typecompte WHERE id = ? ;", 1005, 1008);     
                statement.setInt(1, idType);
                ResultSet rst = statement.executeQuery();
                statement.clearParameters();
                rst.next();
            
                jplayer.put("role",rst.getString("type"));
                jplayer.put("idJoueur", rs.getInt("id"));
               
                
                jAllplayers.put(jplayer);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
               System.out.print(e.toString());
           }
        return jAllplayers;
   }
   public boolean DeleteAPlayer(int idJoueur ){
       Connection con = null;
       con = new ConnectDb().GetConnection();
       
       try{
            PreparedStatement statement = con.prepareStatement("DELETE Joueur, ressource FROM Joueur JOIN ressource  ON ressource.id = Joueur.idRessource WHERE  Joueur.id = ?", 1005, 1008);     
            statement.setInt(1, idJoueur);
            statement.executeUpdate();
            statement.clearParameters();
            
            
            con.close();
          
           }catch(SQLException  e){
               System.out.print(e.toString());
               return false;
           }
                  
       return true;
   }
   public boolean EditAPlayer(String typeJoueur, String userName, String passWord ){
       Connection con = null;
       con = new ConnectDb().GetConnection();
       return true;
   } 
   
}
