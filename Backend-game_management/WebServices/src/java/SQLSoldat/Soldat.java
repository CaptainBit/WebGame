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
import SQLRessource.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author admin
 */
public class Soldat 
{    
    public boolean AddSoldat(String userName, int idTypeSoldat){
        
        Connection con = null;
        
        con = new ConnectDb().GetConnection();        
        
        try{
            PreparedStatement statement = con.prepareStatement(
                    "select idRessource, id from joueur where userName = ?"
                    , 1005, 1008);   
            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            rs.next();
            
            int idJoueur = rs.getInt("id");
            int idRessource = rs.getInt("idRessource");
            
            statement = con.prepareStatement(
                    "INSERT INTO soldat\n" +
                    "(idJoueur, idTypeSoldat)\n" +
                    "VALUES(?, ?);"
                    , 1005, 1008);   
            
            statement.setInt(1, idJoueur);
            statement.setInt(2, idTypeSoldat);
            
            statement.executeUpdate();
            statement.clearParameters();
            
            JSONObject ressourceType = getRessource(con, idTypeSoldat);
            
            con.close();
            
            Ressource ressource = new Ressource();
            int nourriture = ressourceType.getInt("nourriture");
            int eau = ressourceType.getInt("eau");
            int argent = ressourceType.getInt("argent");
            int science = ressourceType.getInt("science");

            ressource.EditRessourceById(idRessource,-nourriture, -eau, -argent, -science);
            
           }catch(SQLException e){
           
             System.out.print(e.toString());
           } catch (JSONException ex) { 
             Logger.getLogger(Soldat.class.getName()).log(Level.SEVERE, null, ex);
         }
         
         return true;    
    }
    
    public boolean DeleteSoldat(int idSoldat, int idType, String userName){
         
         Connection con = null;
         
         try {
            con = new ConnectDb().GetConnection();     
             
            PreparedStatement statement = con.prepareStatement(
                    "Delete from soldat where id = ?;"
                    , 1005, 1008);

            statement.setInt(1, idSoldat);
            statement.executeUpdate();
            statement.clearParameters();  

            statement = con.prepareStatement(
                       "SELECT idRessource FROM joueur where userName = ?;"
                    , 1005, 1008);

            statement.setString(1, userName);
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();

            rs.next();
             
            int idRessource = rs.getInt("idRessource");
            
            JSONObject ressourceType = getRessource(con, idType);
            
            con.close();
            
            Ressource ressource = new Ressource();
            int nourriture = ressourceType.getInt("nourriture");
            int eau = ressourceType.getInt("eau");
            int argent = ressourceType.getInt("argent");
            int science = ressourceType.getInt("science");

            ressource.EditRessourceById(idRessource,nourriture / 2, eau / 2, argent / 2, science / 2);
             
             return true;
         }
        catch (SQLException ex) {
             Logger.getLogger(Soldat.class.getName()).log(Level.SEVERE, null, ex);
         } catch (JSONException ex) {
             Logger.getLogger(Soldat.class.getName()).log(Level.SEVERE, null, ex);
         }
        return false;
     }
    
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
                    "SELECT soldat.id, p_typesoldat.nom as soldat, " +
                    "p_typearme.nom as arme, p_typearmure.nom as armure, \n" +
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
                
                int idRessource = rs.getInt("idRessource");
                
                soldat.put("id", rs.getInt("id"));
                soldat.put("idRessource", rs.getInt("idRessource"));
                soldat.put("force", rs.getInt("force"));
                soldat.put("vie", rs.getInt("vie"));                
                soldat.put("nom", rs.getString("nom"));
                
                Ressource ressource = new Ressource();
                JSONObject ressourceType = ressource.getRessourceById(idRessource);
                           
                int nourriture =  ressourceType.getInt("nourriture");
                int argent =  ressourceType.getInt("argent");
                int eau =  ressourceType.getInt("eau");
                int science =  ressourceType.getInt("science");

                soldat.put("nourriture", nourriture);
                soldat.put("argent", argent);
                soldat.put("eau", eau);
                soldat.put("science", science);
                
                jtypes.put(soldat);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
             System.out.print(e.toString());
           }
       
        return jtypes;
    }
    
    private JSONObject getRessource(Connection con, int idType){
         JSONObject ressource = new JSONObject();

         try {
             PreparedStatement statement = con.prepareStatement(
                     "SELECT \n" +
                             "ressource.nourriture, ressource.argent, \n" +
                             "ressource.eau, ressource.science \n" +
                             "FROM p_typesoldat\n" +
                             "join ressource on idRessource = ressource.id\n" +
                             "where p_typesoldat.id = ?;"
                     , 1005, 1008);
             
             statement.setInt(1, idType);
             ResultSet rs = statement.executeQuery();
             statement.clearParameters();
             
             rs.next();
            
            ressource.put("argent", rs.getInt("argent"));
            ressource.put("eau", rs.getInt("eau"));
            ressource.put("science", rs.getInt("science"));
            ressource.put("nourriture", rs.getInt("nourriture"));
            
             
         } catch (SQLException ex) {
             Logger.getLogger(Soldat.class.getName()).log(Level.SEVERE, null, ex);
         } catch (JSONException ex) {
             Logger.getLogger(Soldat.class.getName()).log(Level.SEVERE, null, ex);
         }
         
         return ressource;
     }
    
    
    
}
