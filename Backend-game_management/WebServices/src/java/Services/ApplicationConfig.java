/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Services;

import SQLRessource.RessourceGiver;
import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author admin
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        
        AddRessourceAllPlayer();
        
        return resources;
    }

    
    private void AddRessourceAllPlayer(){
        RessourceGiver thread = new RessourceGiver();
        thread.start();
    }

    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(Props.CrossOrigin.class);
        resources.add(Services.ArmureService.class);
        resources.add(Services.GenericResource.class);
        resources.add(Services.GunService.class);
        resources.add(Services.SoldatService.class);
        resources.add(Services.TerritoireService.class);
    }
    
}
