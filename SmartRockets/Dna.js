
export class Dna {
    constructor(genes) {
        this.m_lifespan = 200;
        this.m_genes = [];

        if (!genes) {
            this.m_genes = [];
            for (let i = 0; i < this.m_lifespan; ++i) {
                this.m_genes[i] = p5.Vector.random2D();
                this.m_genes[i].setMag(1.5);
            }
        } else {
            this.m_genes = genes;
        }
    }

    NextGene(i) {
        if (i >= this.m_lifespan) {
            return null;
        }

        return this.m_genes[i];
    }

    Lifespan() {
        return this.m_lifespan;
    }

    Crossover(partner) {
        let new_genes = [];
        let mid = floor(random(this.m_genes.length));
        for (let i = 0; i < this.m_genes.length; ++i) {
            if (i > mid) {
                new_genes[i] = this.m_genes[i];
            } else {
                new_genes[i] = partner.genes[i];
            }
        }
        return new Dna(new_genes);
    }

    Mutate() {
        for (let i = 0; i < this.m_genes.length; ++i) {
            if (random(1) < 0.001) {
                this.m_genes[i] = p5.Vector.random2D();
                this.m_genes[i].setMag(1.5);
            }
        }
    }

    get genes() {
        return this.m_genes;
    }

}