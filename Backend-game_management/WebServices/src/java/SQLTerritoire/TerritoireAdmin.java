/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SQLTerritoire;

import Shared.ConnectDb;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;



/**
 *
 * @author admin
 */
public class TerritoireAdmin {
    
    public static boolean AddNewTerritoire(String nomTerritoire, int nourriture, int eau, int argent, int science, int idPlayer)
    {
        
        Connection con = null;
        
        
        try{
            con = new ConnectDb().GetConnection();      
            
            
            //Create idRessource
            PreparedStatement statement = con.prepareStatement("INSERT INTO `RESSOURCES`(`nourriture`, `eau`, `argent`, `science`) VALUES (?,?,?)", 1005, 1008);  
            statement.setInt(1, nourriture);
            statement.setInt(2, eau);
            statement.setInt(3, argent);
            statement.setInt(4, science);
            statement.executeUpdate();
            statement.clearParameters();
            
            //Get last id ressource
             statement = con.prepareStatement("Select MAX(id) from ressource ", 1005, 1008);       
             ResultSet rs = statement.executeQuery();
             rs.next();
             statement.clearParameters();
             
             int idR = rs.getInt(1);
             
             
             
            //Create territoire
            statement = con.prepareStatement("INSERT INTO `TERRITOIRE`(`nom`, `idRessource`, `idJoueur`) VALUES (?,?,?)", 1005, 1008);  
            statement.setString(1, nomTerritoire);
            statement.setInt(2, idR);
            statement.setInt(3, idPlayer);
            statement.executeUpdate();
            statement.clearParameters();
        }catch(SQLException e){
            return false;
            
        }
        
        return true;
    }
    
}
