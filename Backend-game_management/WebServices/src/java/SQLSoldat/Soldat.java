/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLSoldat;

import SQLSoldat.*;
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
public class Soldat 
{    
    public JSONArray getSoldatPlayer(String userName)
    {
        JSONArray jSoldats = new JSONArray();
        
         Connection con = null;
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement(
                    "SELECT * FROM game_management.soldat\n" +
                    "join joueur on joueur.id = soldat.idJoueur\n" +
                    "where joueur.userName = ?;"
                    , 1005, 1008);   
            
            statement.setString(1, userName);
            
            ResultSet rs = statement.executeQuery();
            
            statement.clearParameters();
            
            while(rs.next())
            {
                JSONObject soldat = new JSONObject();
                
                soldat.put("id", rs.getInt("id"));
                soldat.put("idJoueur", rs.getInt("idJoueur"));
                soldat.put("idTerritoire", rs.getInt("idTerritoire"));
                soldat.put("idTypeSoldat", rs.getInt("idTypeSoldat"));
                soldat.put("idArme", rs.getInt("idArme"));
                soldat.put("idArmure", rs.getInt("idArmure"));
                               
                jSoldats.put(soldat);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
             System.out.print(e.toString());
           }
       
        return jSoldats;
    }
    
    public JSONArray getSoldatPlayerSansTerritoire(String userName)
    {
        JSONArray jtypes = new JSONArray();
        
         Connection con = null;
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement(
                    "SELECT soldat.id, p_typesoldat.description as soldat, " +
                    "p_typearme.nomArme as arme, p_typearmure.description as armure, \n" +
                    "(p_typesoldat.vie + COALESCE(p_typearmure.vie,0)) as vieTotal, " +
                    "(p_typesoldat.force + COALESCE(p_typearme.force,0)) as forceTotal " +
                    "FROM game_management.soldat as soldat \n" +
                    "join joueur on soldat.idJoueur = joueur.id \n" + 
                    "join p_typesoldat on soldat.idTypeSoldat = p_typesoldat.id\n" +
                    "left join arme on soldat.idArme = arme.id \n" +
                    "left join p_typearme on arme.idTypeArme = p_typearme.id\n" +
                    "left join armure on soldat.idArmure = armure.id\n" +
                    "left join p_typearmure on armure.idTypeArmure = p_typearmure.id\n" +
                    "where soldat.idTerritoire is null AND joueur.userName = ?;"
                    , 1005, 1008);   
            
            statement.setString(1, userName);
            
            ResultSet rs = statement.executeQuery();
            
            statement.clearParameters();
            
            while(rs.next())
            {
                JSONObject soldat = new JSONObject();
                
                soldat.put("id", rs.getInt("id"));
                soldat.put("soldat", rs.getString("soldat"));
                soldat.put("arme", rs.getString("arme"));
                soldat.put("armure", rs.getString("armure"));
                
                soldat.put("vieTotal", rs.getInt("vieTotal"));
                soldat.put("forceTotal", rs.getInt("forceTotal"));
                               
                jtypes.put(soldat);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
             System.out.print(e.toString());
           }
       
        return jtypes;
    }
    
    public JSONArray getTypeSoldat()
    {
        JSONArray jtypes = new JSONArray();
        
         Connection con = null;
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement(
                    "SELECT * FROM game_management.p_typesoldat;"
                    , 1005, 1008);   
                        
            ResultSet rs = statement.executeQuery();
            
            statement.clearParameters();
            
            while(rs.next())
            {
                JSONObject soldat = new JSONObject();
                
                soldat.put("id", rs.getInt("id"));
                soldat.put("idRessource", rs.getInt("idRessource"));
                soldat.put("force", rs.getInt("force"));
                soldat.put("vie", rs.getInt("vie"));                
                soldat.put("description", rs.getString("description"));
                               
                jtypes.put(soldat);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
             System.out.print(e.toString());
           }
       
        return jtypes;
    }
    
    
    
}
