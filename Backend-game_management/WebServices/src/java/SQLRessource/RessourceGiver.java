/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLRessource;

import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import SQLRessource.*;
/**
 *
 * @author admin
 */
public class RessourceGiver extends Thread {
    public void run(){
      while(true){
        Connection con = null;
        
        try {
            con = new ConnectDb().GetConnection();
            
            int nourriture;
            int eau;
            int argent;
            int science;
            
            int idRessource;
            int idPlayer;        
            
            PreparedStatement statement = con.prepareStatement("SELECT id, idRessource FROM joueur where idTypeCompte = 2;", 1005, 1008);      
            
            ResultSet rs = statement.executeQuery();
            statement.clearParameters();
            
            while(rs.next()){
                
                idPlayer = rs.getInt("id");
                idRessource = rs.getInt("idRessource");
                
                nourriture = 10;
                eau = 10;
                argent = 10;
                science = 10;
                
                statement = con.prepareStatement("SELECT idRessource FROM territoire where idJoueur = ?;", 1005, 1008);      
            
                statement.setInt(1, idPlayer);
                
                ResultSet rsTerritoire = statement.executeQuery();
                statement.clearParameters();

                Ressource ressource = new Ressource();
                int idRessourceTerritoire;
                JSONObject ressourceTerritoire;
                
                while (rsTerritoire.next()) {
                    
                    idRessourceTerritoire = rsTerritoire.getInt("idRessource");
                    
                    ressourceTerritoire = ressource.getRessourceById(idRessourceTerritoire);
                    
                    nourriture += ressourceTerritoire.getInt("nourriture");
                    eau += ressourceTerritoire.getInt("eau");
                    argent += ressourceTerritoire.getInt("argent");
                    science += ressourceTerritoire.getInt("science");
                }
                
                ressource.EditRessourceById(idRessource, nourriture, eau, argent, science);
            }
            
            
            Thread.sleep(300000);
        } catch (InterruptedException ex) {
            Logger.getLogger(RessourceGiver.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
              Logger.getLogger(RessourceGiver.class.getName()).log(Level.SEVERE, null, ex);
          } catch (JSONException ex) {
              Logger.getLogger(RessourceGiver.class.getName()).log(Level.SEVERE, null, ex);
          }
      }
    }
}
