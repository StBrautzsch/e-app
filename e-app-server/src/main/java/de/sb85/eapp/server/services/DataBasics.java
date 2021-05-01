package de.sb85.eapp.server.services;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class DataBasics {

    @Id
    @GeneratedValue
    @Column(unique = true)
    private Integer id;

    private Date creationDate;
    private Date modifyDate;

    public DataBasics() {
        setCreationDate();
    }

    protected void setCreationDate() {
        creationDate = new Date();
        modifyDate = creationDate;
    }

    protected void setModifyDate() {
        modifyDate = new Date();
    }

    public Integer getId() {
        return id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

}
