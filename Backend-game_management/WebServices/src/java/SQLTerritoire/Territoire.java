/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLTerritoire;

import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
/**
 *
 * @author admin
 */
public class Territoire 
{    
    public JSONArray getTerritoirePlayer(String userName)
    {
        JSONArray jTerritoire = new JSONArray();
        
         Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement(
                    "SELECT territoire.id, territoire.nom\n" +
                    "FROM game_management.territoire\n" +
                    "join joueur on joueur.id = territoire.idJoueur\n" +
                    "where joueur.userName = ?;", 
                    1005, 1008);   
            
            statement.setString(1, userName);
            
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            while(rs.next())
            {
                JSONObject territoire = new JSONObject();
                
                territoire.put("id", rs.getInt("id"));
                territoire.put("nom", rs.getString("nom"));
                
                jTerritoire.put(territoire);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
             System.out.print(e.toString());
           }
       
        return jTerritoire;
    }
    
    
    public JSONArray getAllTerritoire()
    {
        JSONArray jtypes = new JSONArray();
        
         Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();      
            
            PreparedStatement statement = con.prepareStatement("SELECT * FROM territoire", 1005, 1008);   
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            while(rs.next())
            {
                JSONObject territoire = new JSONObject();
                
                int idRessource = rs.getInt("idRessource");
                
                statement = con.prepareStatement("SELECT * FROM ressource where id  = ?", 1005, 1008);  
                statement.setInt(1, idRessource);
                
                ResultSet rt = statement.executeQuery();
                statement.clearParameters();
                
                rt.next();
                
                int idJoueur = rs.getInt("idJoueur");
                
                statement = con.prepareStatement("SELECT * FROM joueur where id  = ?", 1005, 1008);  
                statement.setInt(1, idJoueur);
                
                ResultSet lstJoueur = statement.executeQuery();
                statement.clearParameters();
                
                lstJoueur.next();
                
                territoire.put("nourriture", rt.getDouble("nourriture"));
                territoire.put("eau", rt.getDouble("eau"));
                territoire.put("argent", rt.getDouble("argent"));
                territoire.put("science", rt.getDouble("science"));
                
                territoire.put("nom", rs.getString("nom"));
                territoire.put("idJoueur", idJoueur);
                territoire.put("id", rs.getInt("id"));
                
                territoire.put("joueur", lstJoueur.getString("userName"));
                
                jtypes.put(territoire);
            }
            
            con.close();
           }catch(SQLException | JSONException e){
             System.out.print(e.toString());
           }
       
        return jtypes;
    }
    
    public boolean Attack(List<Integer> idSoldats, int idTerritoire, String userName)
    {        
        Connection con = null;
        boolean WinAttaque = false;
         
        try{
            con = new ConnectDb().GetConnection();
            //Fonction pour avoir la liste des défenses et des attaques
            JSONArray lstDefense = getDefense(con, idTerritoire);
            JSONArray lstAttaque = getAttaque(con, idSoldats);
            int vieTotalAttaque = getIntTotal(lstAttaque, "vieTotal");
            int forceTotalAttaque = getIntTotal(lstAttaque, "forceTotal");
            int vieTotalDefense = getIntTotal(lstDefense, "vieTotal");
            int forceTotalDefense = getIntTotal(lstDefense, "forceTotal");
            int ptsBatailleDefense = 0;
            int ptsBatailleAttaque = 0;
            //Combat poche temporaire
            if(vieTotalAttaque > forceTotalDefense){
                ptsBatailleAttaque++;
            }
            else{
                ptsBatailleDefense++;
            }
            if(vieTotalDefense >= forceTotalAttaque){
                ptsBatailleDefense++;
            }
            else{
                ptsBatailleAttaque++;
            }
            if(forceTotalDefense >= forceTotalAttaque){
                ptsBatailleDefense++;
            }
            else{
                ptsBatailleAttaque++;
            }
            if(vieTotalDefense >= vieTotalAttaque){
                ptsBatailleDefense++;
            }
            else{
                ptsBatailleAttaque++;
            }
            //Victoire d'un camp
            if(ptsBatailleAttaque > ptsBatailleDefense){
                UpdateTerritoireIdJoueur(con, idTerritoire, userName, idSoldats);
                for (int i=0; i < lstDefense.length(); i++) {
                    JSONObject item =  lstDefense.getJSONObject(i);
                    int idSoldat = item.getInt("id");
                    RemoveSoldat(con, idSoldat);
                }
                WinAttaque = true;
            }
            else
            {
                for(int i : idSoldats){
                    RemoveSoldat(con, i);
                }
                WinAttaque = false;
            }
            con.close();
        }
        catch (JSONException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return WinAttaque;
    }
    
    private JSONArray getDefense(Connection con, int idTerritoire){
        JSONArray lstDefense = new JSONArray();
        JSONObject soldat;

        try {
            //Remplis la liste pour les soldat Défense
            
            
            PreparedStatement statement = con.prepareStatement(
                    "SELECT \n" +
"                    soldat.id, \n" +
"                    (p_typesoldat.vie + COALESCE(p_typearmure.vie,0)) as vieTotal, \n" +
"                    (p_typesoldat.force + COALESCE(p_typearme.force,0)) as forceTotal \n" +
"                    FROM soldat\n" +
"                    join joueur on soldat.idJoueur = joueur.id\n" +
"                    join p_typesoldat on soldat.idTypeSoldat = p_typesoldat.id\n" +
"                    left join arme on soldat.id = arme.idSoldat \n" +
"                    left join p_typearme on arme.idTypeArme = p_typearme.id\n" +
"                    left join armure on soldat.id = armure.idSoldat\n" +
"                    left join p_typearmure on armure.idTypeArmure = p_typearmure.id\n" +
"                    where soldat.idTerritoire = ?;"
                    , 1005, 1008);
            
            statement.setInt(1, idTerritoire);
            
            ResultSet rs = statement.executeQuery();
            
            statement.clearParameters();
            
            while(rs.next())
            {
                soldat = new JSONObject();
                
                soldat.put("vieTotal", rs.getInt("vieTotal"));
                soldat.put("forceTotal", rs.getInt("forceTotal"));
                soldat.put("id", rs.getInt("id"));
                
                lstDefense.put(soldat);
            }
            
        
        } catch (SQLException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JSONException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstDefense;
    }
    
    private JSONArray getAttaque(Connection con, List<Integer> idSoldats){
        JSONArray lstAttaque = new JSONArray();
        JSONObject soldat;

        try {
            //Remplis la liste pour la liste soldat Attaque
            ResultSet resultSoldatAttaque;
            
            for(int id : idSoldats){
                PreparedStatement statement = con.prepareStatement(
                    "SELECT \n" +
                    "soldat.id, \n" +
                    "(p_typesoldat.vie + COALESCE(p_typearmure.vie,0)) as vieTotal, \n" +
                    "(p_typesoldat.force + COALESCE(p_typearme.force,0)) as forceTotal \n" +
                    "FROM game_management.soldat as soldat \n" +
                    "join joueur on soldat.idJoueur = joueur.id\n" +
                    "join p_typesoldat on soldat.idTypeSoldat = p_typesoldat.id\n" +
                    "left join arme on soldat.id = arme.idSoldat \n" +
                    "left join p_typearme on arme.idTypeArme = p_typearme.id\n" +
                    "left join armure on soldat.id = armure.idSoldat\n" +
                    "left join p_typearmure on armure.idTypeArmure = p_typearmure.id\n" +
                    "where soldat.id = ?;"
                    , 1005, 1008);   
            
                statement.setInt(1, id);

                resultSoldatAttaque  = statement.executeQuery();

                statement.clearParameters();

                resultSoldatAttaque.next();

                soldat = new JSONObject();

                soldat.put("vieTotal", resultSoldatAttaque.getInt("vieTotal"));
                soldat.put("forceTotal", resultSoldatAttaque.getInt("forceTotal"));
                soldat.put("id", resultSoldatAttaque.getInt("id"));

                lstAttaque.put(soldat);
            }
            
        
        } catch (SQLException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JSONException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        }
        return lstAttaque;
    }
    
    private int getIntTotal(JSONArray list, String objectToGet){
        int Count = 0;
        try {
            for (int i=0; i < list.length(); i++) {
                JSONObject item =  list.getJSONObject(i);
                Count += item.getInt(objectToGet);
            }
        } catch (JSONException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return Count;
    }
    
    private void UpdateTerritoireIdJoueur(Connection con, int idTerritoire,String userName, List<Integer> idSoldats){
        try {
            PreparedStatement statement = con.prepareStatement(
                    "select id from game_management.joueur WHERE joueur.userName = ?;"
                    , 1005, 1008);   
            
            statement.setString(1, userName);
                        
            ResultSet rs = statement.executeQuery();
            
            rs.next();
            
            int idJoueur = rs.getInt("id");
            statement.clearParameters();
            
            statement = con.prepareStatement(
                    "update game_management.territoire as territoire\n" +
                    "inner join joueur\n" +
                    "on territoire.idJoueur = joueur.id\n" +
                    "SET\n" +
                    "territoire.idJoueur = ? \n" +
                    "WHERE territoire.id = ?;"
                    , 1005, 1008);   
            
            statement.setInt(1, idJoueur);
            statement.setInt(2, idTerritoire);
                        
            statement.executeUpdate();
            statement.clearParameters();
            
            for(int idSoldat : idSoldats){
                statement = con.prepareStatement(
                    "update game_management.soldat as soldat\n" +
                    "SET\n" +
                    "soldat.idTerritoire = ? \n" +
                    "WHERE soldat.id = ?;"
                    , 1005, 1008);   
            
                statement.setInt(1, idTerritoire);
                statement.setInt(2, idSoldat);

                statement.executeUpdate();
                statement.clearParameters();
            }
        } catch (SQLException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void RemoveSoldat(Connection con, int idSoldat){
        try {
            PreparedStatement statement = con.prepareStatement(
                    "DELETE FROM soldat\n" +
                    "WHERE id = ?;"
                    , 1005, 1008);   
            
            statement.setInt(1, idSoldat);
                        
            statement.executeUpdate();
            statement.clearParameters();
        } catch (SQLException ex) {
            Logger.getLogger(Territoire.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
