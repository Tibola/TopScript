package recovery;

import topscript.*;

import java.util.*;


public class RecoverySet extends HashSet {
    public RecoverySet()
    // cria conjunto vazio 
    {
        super();
    }

    public RecoverySet(int t)
    // cria conjunto com 1 tipo de token 
    {
        this.add(new Integer(t));
    }

    public boolean contains(int t)
    // verifica se token pertence ao conjunto
    {
        return super.contains(new Integer(t));
    }

    public RecoverySet union(RecoverySet s)
    // faz a união de dois conjuntos
    {
        RecoverySet t = null;

        if (s != null) // se s == null retorna null
         {
            t = (RecoverySet) this.clone();
            t.addAll(s);
        }

        return t;

        // retorna um terceiro conjunto, sem destruir nenhum
    }

    public RecoverySet remove(int n)
    // retira 1 elemento do conjunto
    {
        RecoverySet t = (RecoverySet) this.clone();
        t.remove(new Integer(n));

        return t; // retorna um novo conjunto, sem 1 dos elementos
    }

    // cria string descrevendo os tokens que pertencem
    // ao conjunto
    public String toString()
    {
        Iterator it = this.iterator();
        String s = "";
        int k;

        while (it.hasNext()) {
            k = ((Integer) it.next()).intValue();
            s += (TopScript.im(k) + " ");
        }

        return s;
    }
}
