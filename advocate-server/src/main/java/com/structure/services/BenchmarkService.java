package com.structure.services;

import com.structure.models.Benchmark;
import com.structure.models.Tracking;
import com.structure.models.Trial;
import com.structure.models.TrialTemplates;
import com.structure.repositories.BenchmarkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;

@Service
public class BenchmarkService {

    @Autowired
    private BenchmarkRepo br;
    private final NumberFormat nf = new DecimalFormat("0.0");

    public void updateBenchmarkTrialAverage(String bmId){
        System.out.println("Updating benchmark average for " + bmId);
        Benchmark bm = br.findById(bmId).orElseThrow();
        double average = sumAllTrialAverages(bm.getTrials());
        bm.setTrialAverage(Double.parseDouble(nf.format(average/bm.getTrials().size())));
    }

    public double sumAllTrialAverages(List<Trial> trials){
        double average = 0.0;
        for(Trial t : trials){
            average += determineTrialAverage(t);
        }
        return average;
    }

    public double determineTrialAverage(Trial t){
        double average = 0.0;
        if(t.getTrialTemplate().equals(TrialTemplates.SCORE_BASIC.name())){
            int correctCount = (int) t.getTrackings().stream().filter(tracking -> tracking.getCorrect() == 1).count();
            double trialPercentage = Double.parseDouble(nf.format((double) correctCount / t.getTrackings().size() * 100));
            System.out.println("Trial percentage: " + trialPercentage);
            average += trialPercentage;
        }else if(t.getTrialTemplate().equals(TrialTemplates.SCORE_BEST_OUT_OF.name())){
            Tracking tr = t.getTrackings().get(0);
            System.out.println("trial accuracy: " + tr.getAccuracyPercentage());
            average += tr.getAccuracyPercentage();
        }
        return average;
    }

    public int setBenchmarkAverage(double avg, String bmId){
        return br.updateBenchmarkTrialAverage(avg, bmId);
    }

}
